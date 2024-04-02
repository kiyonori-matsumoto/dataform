export const separator = (() => {
  if (typeof process !== "undefined") {
    return process.platform === "win32" ? "\\" : "/";
  }
  return "/";
})();

export function relativePath(fullPath: string, base: string) {
  if (base.length === 0) {
    return fullPath;
  }
  const stripped = fullPath.substr(base.length);
  if (stripped.startsWith(separator)) {
    return stripped.substr(1);
  } else {
    return stripped;
  }
}

export function fileName(fullPath: string) {
  return fullPath
    .split(separator)
    .slice(-1)[0]
    .split(".")[0];
}

export function dirName(fullPath: string) {
  return fullPath.slice(0, fullPath.lastIndexOf(separator));
}

export function join(...paths: string[]) {
  return paths
    .map(path => {
      if (path.startsWith(separator)) {
        path = path.slice(1);
      }
      if (path.endsWith(separator)) {
        path = path.slice(0, -1);
      }
      return path;
    })
    .join(separator);
}

export function escapedFileName(path: string) {
  return fileName(path).replace(/\\/g, "\\\\");
}

export function fileExtension(fullPath: string) {
  return fullPath.split(".").slice(-1)[0];
}

export function normalize(path: string) {
  const parts = [];
  let dotDotCount = 0;
  for (const part of path.split("/").filter(part => !!part && part !== ".")) {
    if (part === "..") {
      if (parts.length === 0) {
        dotDotCount++;
      } else {
        parts.pop();
      }
    } else {
      parts.push(part);
    }
  }
  if (path.startsWith("/")) {
    if (parts.length === 0) {
      return "/";
    }
    parts.unshift("");
  } else {
    parts.unshift(...new Array(dotDotCount).fill(".."));
    if (parts.length === 0) {
      return ".";
    }
  }
  return parts.join("/");
}
