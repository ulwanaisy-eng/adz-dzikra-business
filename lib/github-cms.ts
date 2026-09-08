const OWNER = process.env.GITHUB_CMS_OWNER || "ulwanaisy-eng";
const REPO = process.env.GITHUB_CMS_REPO || "adz-dzikra-business";
const BRANCH = process.env.GITHUB_CMS_BRANCH || "main";

function api(path: string) {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
}

async function github(path: string, init: RequestInit = {}) {
  const token = process.env.GITHUB_CMS_TOKEN;
  if (!token) throw new Error("GITHUB_CMS_TOKEN belum diatur.");
  const response = await fetch(api(path) + (path.includes("?") ? "" : `?ref=${BRANCH}`), {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init.headers || {})
    },
    cache: "no-store"
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.message || `GitHub error ${response.status}`);
  return body;
}

export async function readCmsFile(path: string) {
  return github(path);
}

export async function writeCmsFile(path: string, content: string, message: string, sha?: string) {
  return github(path, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch: BRANCH,
      ...(sha ? { sha } : {})
    })
  });
}

export async function writeBinaryFile(path: string, base64: string, message: string, sha?: string) {
  return github(path, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: base64,
      branch: BRANCH,
      ...(sha ? { sha } : {})
    })
  });
}
