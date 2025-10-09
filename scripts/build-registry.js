const fs = require("fs/promises")
const path = require("path")

const REGISTRY_PATH = path.resolve("dist/registry.json")
const COMPONENTS_DIR = path.resolve("src/components/ui")

function parseJSDoc(content) {
  const props = {}
  const propRegex = /@prop \{([^\}]+)\} \{([^\}]+)\} \{([^\}]+)\} \{([^\}]+)\} - (.+)/g
  let match

  while ((match = propRegex.exec(content)) !== null) {
    const [_, name, type, options, defaultValue, description] = match
    props[name] = {
      name,
      type,
      options: type === 'enum' ? options.split('|') : [],
      defaultValue,
      description,
    }
  }

  return props
}

async function buildRegistry() {
  const registry = {}
  const componentFiles = await fs.readdir(COMPONENTS_DIR)

  for (const file of componentFiles) {
    if (path.extname(file) === ".tsx") {
      const name = path.basename(file, ".tsx")
      const content = await fs.readFile(path.join(COMPONENTS_DIR, file), "utf-8")

      const dependencies = (content.match(/from "([^"]+)"/g) || [])
        .map(line => line.slice(6, -1))
        .filter(dep => !dep.startsWith("."))

      const usageMatch = content.match(/\/\*\* @usage([\s\S]*?)\*\//)
      const usage = usageMatch ? usageMatch[1].replace(/\n\s*\*\s?/g, "\n").trim() : null

      const props = parseJSDoc(content)

      registry[name] = {
        name,
        dependencies: [...new Set(dependencies)],
        files: [`src/components/ui/${file}`],
        usage: usage,
        props: props // Add the new schema
      }
    }
  }

  await fs.mkdir(path.dirname(REGISTRY_PATH), { recursive: true });
  await fs.writeFile(REGISTRY_PATH, JSON.stringify(registry, null, 2))
  console.log("✅ Component registry with schema built successfully!")
}

buildRegistry()