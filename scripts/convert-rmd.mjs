import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, } from "node:fs"

import { execFileSync } from "node:child_process"
import path from "node:path"

const pandocPath = 
    "C:\\Program Files\\RStudio\\resources\\app\\bin\\quarto\\bin\\tools\\pandoc.exe"

const inputDirectory = path.resolve("source-rmd", "Instrument",)
const outputDirectory = path.resolve("src", "pages", "Instrument",)
const temporaryDirectory = path.resolve("temp-convertd-markdown", )

function cleanMarkdown(content) {
    let cleanedContent = content

    /* Normalize windows line endings. */
    cleanedContent = cleanedContent.replace(/\r\n/g, "\n",)
    /* Remove the bookdown part heading. */
    cleanedContent = cleanedContent.replace(/^# \(PART\*\).*$/gm, "")

    /* Remove Bookdwon heading attributes. ex: {-}, {#overview} */
    cleanedContent = cleanedContent.replace(/\s*{\-\}/g, "")
    cleanedContent = cleanedContent.replace(/\s*{#[^]+\}/g, "")

    /* change ## **Overview** into ## Overview */
    cleanedContent = cleanedContent.replace(/^(#{1,6})\s+\*\*(.+?)\*\*\s*$/gm, "$1 $2", )

    /* limit excessive blank lines, but preserve normal paragraph spacing*/
    cleanedContent = cleanedContent.replace(/\r\n/g, "n")
    cleanedContent = cleanedContent.replace(/\n{3,}/g, "\n\n")
    return cleanedContent.trim() + "\n"
}

function convertFile(fileName) {
    const fileBaseName = path.basename(
        fileName,
        path.extname(fileName),
    )

    const inputFile = path.join(inputDirectory, fileName,)
    const temporaryFile = path.join(temporaryDirectory, `${fileBaseName}.md`,)
    const outputFile = path.join(outputDirectory, `${fileBaseName}.mdx`,)

    console.log("")
    console.log(`Converting ${fileName}...`)

    execFileSync(
    pandocPath,
    [inputFile, "--from=markdown", "--to=gfm", "--output", temporaryFile,],
    { stdio: "inherit", },
    )

    const markdownContent = readFileSync(temporaryFile, "utf8",)
    const cleanedContent = cleanMarkdown(markdownContent, )

    writeFileSync(outputFile, cleanedContent, "utf8", )

    console.log(`Created ${path.relative(process.cwd(), outputFile,)}`, )
}

    const rmdFiles = readdirSync(inputDirectory,).filter((fileName)=> fileName.toLowerCase().endsWith(".rmd"),)
    if (rmdFiles.length === 0) {
        console.log("No Rmd files were found in source-rmd/Instrument.",)
        process.exit(0)
    }

    console.log(`Found ${rmdFiles.length} Rmd file(s).` ,)

    for (const fileName of rmdFiles) {
        try {
            convertFile(fileName)
        } catch (error) {
            console.error("")
            console.error(
                `Failed to convert ${fileName}.`, 
            )
            console.error(error.message)
            process.exitCode = 1
        }
    }

    rmSync(temporaryDirectory, {recursive: true, force: true,} ,)

console.log("")
console.log("Conversion process finished.")