import { mkdirSync, readFileSync, writeFileSync, } from "node:fs"

import { execFileSync } from "node:child_process"
import path from "node:path"

const pandocPath = 
    "C:\\Program Files\\RStudio\\resources\\app\\bin\\quarto\\bin\\tools\\pandoc.exe"

const inputFile = path.resolve("source-rmd", "Instrument", "AGMTestBox.Rmd", )
const temporaryFile = path.resolve("source-rmd", "Instrument", "AGMTestBox-temp.md", )
const outputDirectory = path.resolve("src", "pages", "Instrument",)
const outputFile = path.join(outputDirectory, "AGMTestBox.mdx", )

mkdirSync(outputDirectory, {
    recursive: true,
})

execFileSync(
    pandocPath,
    [inputFile, "--from=markdown", "--to=gfm", "--output", temporaryFile,],
    { stdio: "inherit", },
)

let content = readFileSync(
    temporaryFile,
    "utf8",
)

/* convert windows line endings to normal line endings. this does not delete the line breaks/ */
content = content.replace(/\r\n/g, "\n")

/* Remove the bookdown part heading. */
content = content.replace(/^# \(PART\*\).*$/gm, "")

/* Remove Bookdwon heading attributes. ex: {-}, {#overview} */
content = content.replace(/\s*{\-\}/g, "")
content = content.replace(/\s*{#[^]+\}/g, "")

/* change ## **Overview** into ## Overview */
content = content.replace(/^(#{1,6})\s+\*\*(.+?)\*\*\s*$/gm, "$1 $2", )

/* limit excessive blank lines, but preserve normal paragraph spacing*/
content = content.replace(/\r\n/g, "n")
content = content.replace(/\n{3,}/g, "\n\n")
content = content.trim()

writeFileSync(
    outputFile,
    content + "\n",
    "utf8",
)

console.log("")
console.log("Converted successfully:")
console.log(outputFile)