import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"
import GithubSlugger from "github-slugger"

const projectRoot = process.cwd()

/* Original .rmd file path */
const sourceRoot = path.join(projectRoot, "source-rmd", "Instrument" ,)

/* .mdx file path after converting*/
const outputRoot = path.join(projectRoot, "src", "pages", "Instrument", )

/* right side bar*/
const outlineOutputPath = path.join(projectRoot, "src", "data", "pageOutlines.json",)

/* pandoc file path*/
const pandocPath =
"C:\\Program Files\\RStudio\\resources\\app\\bin\\quarto\\bin\\tools\\pandoc.exe"

function ensureDirectory(directoryPath) { fs.mkdirSync(directoryPath, { recursive: true, }) }

function findRmdFiles(directoryPath) { if (!fs.existsSync(directoryPath)) { return [] }

    const entries = fs.readdirSync(directoryPath, { withFileTypes: true, })

    return entries.flatMap((entry) => { const fullPath = path.join( directoryPath, entry.name, )

    if (entry.isDirectory()) { return findRmdFiles(fullPath) }

    if (/\.rmd$/i.test(entry.name)) { return [fullPath] }

    return []
})
}

function toKebabCase(value) {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
        .replace(/[_\s]+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase()
}

function removeMarkdownFormatting(value) {
    return value
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/__([^_]+)__/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/_([^_]+)_/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        trim()
}

function cleanMdx(markdown) {
    let cleaned = markdown

/* delete  # (PART*) Instruments */
cleaned = cleaned.replace( /^#\s+$begin:math:text$PART\\\*\?$end:math:text$\s+.*(?:\r?\n)?/gim, "", )

/* delete {-} * {#custom-id} * {.unnumbered} */
cleaned = cleaned.replace( /\s*\{(?:-?|#[^}]+|\.[^}]+)\}\s*$/gm, "", )

/* clean **bold**, ## **Overview** change into  ## Overview */
cleaned = cleaned.replace( /^(#{1,6})\s+\*\*(.+?)\*\*\s*$/gm, "$1 $2", )

/* <0 in the table will change into * &lt;0 */
cleaned = cleaned.replace( /<(?=\s*-?\d)/g, "< ;",)

/* clean space end of each line */
cleaned = cleaned .split(/\r?\n/) .map((line) => line.trimEnd()) .join("\n")

/* clean space line */
cleaned = cleaned.replace( /\n{4,}/g, "\n\n\n", )

return `${cleaned.trim()}\n`
}

function addHeadingIdsAndExtractOutline(mdxContent) {
    const slugger = new GithubSlugger()
    const outline = []

    const headingPattern = /^(#{1,3})[ \t]+(.+?)[ \t]*$/gm

    const contentWithIds = mdxContent.replace(
        headingPattern,
        (fullMatch, hashMarks, rawLabel) => {
        const level = hashMarks.length
        const label = removeMarkdownFormatting(rawLabel)

        if (!label) {return fullMatch}

        const id = slugger.slug(label)

        outline.push({
            label,
            id,
            level,
        })

/* Explicit JSX heading ensures that: pageOutlines.json ID and rendered HTML heading ID are exactly the same. */
        return `<h${level} id="${id}">${label}</h${level}>`},
)

    return {
        contentWithIds,
        outline,
    }
}


function createRoutePath(relativeRmdPath) {
    const parsedPath = path.parse(relativeRmdPath)
    const pageName = toKebabCase(parsedPath.name)

    return `/instrument/${pageName}`
}

function convertFile(sourceFile, pageOutlines) {
    const relativePath = path.relative( sourceRoot, sourceFile, )
    const relativeDirectory = path.dirname(relativePath)
    const parsedSource = path.parse(sourceFile)
    const outputDirectory = path.join( outputRoot, relativeDirectory, )
    const outputFile = path.join( outputDirectory, `${parsedSource.name}.mdx`, )

    ensureDirectory(outputDirectory)
    console.log( `Converting ${relativePath}...`, )

    let convertedMarkdown
    try { convertedMarkdown = execFileSync( pandocPath, [sourceFile, "--from=markdown", "--to=gfm", "--wrap=none", ], { encoding: "utf8", stdio: [ "ignore", "pipe", "pipe", ],
}, ) } catch (error) {const errorMessage = error.stderr?.toString() ?? error.message
        throw new Error( `Pandoc failed for ${relativePath}:\n${errorMessage}`, ) }

    const cleanedMdx = cleanMdx(convertedMarkdown)
    const {contentWithIds, outline, } = addHeadingIdsAndExtractOutline(cleanedMdx)
    fs.writeFileSync( outputFile, contentWithIds, "utf8", )
    const routePath = createRoutePath(relativePath)
    pageOutlines[routePath] = outline

    console.log(`Created ${path.relative(projectRoot, outputFile)}`, )
    console.log(`Found ${outline.length} headings for ${routePath}`, )
}

function sortObjectByKey(object) { return Object.fromEntries(Object.entries(object).sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey), ),) }

function main() {console.log("Starting Rmd conversion...\n")
    if (!fs.existsSync(pandocPath)) { throw new Error(
            ["Pandoc executable was not found:", pandocPath, "", "Check the Pandoc path or set PANDOC_PATH.", ].join("\n"),) }

    if (!fs.existsSync(sourceRoot)) { throw new Error(
            ["Rmd source directory was not found:", sourceRoot, ].join("\n"), ) }

    const rmdFiles = findRmdFiles(sourceRoot)

    if (rmdFiles.length === 0) { console.log( `No Rmd files found in ${sourceRoot}`, )
 return
}

    const pageOutlines = {}
    for (const sourceFile of rmdFiles) {convertFile(sourceFile, pageOutlines,)}

    ensureDirectory(path.dirname(outlineOutputPath),)

    const sortedOutlines = sortObjectByKey(pageOutlines)
    fs.writeFileSync(outlineOutputPath, `${JSON.stringify(sortedOutlines, null, 2, )}\n`, "utf8", )

    console.log("\nConversion process finished.", )
    console.log(`Converted ${rmdFiles.length} Rmd file(s).`, )
    console.log(`Generated ${path.relative(projectRoot, outlineOutputPath, )}`,)
}

    try {
        main()
    } catch (error) {
      console.error(`\nConversion failed:\n${error.message}`, )

    process.exitCode = 1
}
