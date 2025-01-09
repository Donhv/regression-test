import { addAutoSuggestion } from './auto-suggestion.js';
import { createMarkdownFile } from './create-markdown-file.js';
import { initCommonFolder, initVisualTestsFolder } from './generate-tests.js';
import { migrate } from './migrate.js';
import { addExtensions } from './recommended-extensions.js';
import { updatePackageJson } from './update-package.js';

export async function initRegressify() {
  await initCommonFolder();
  await initVisualTestsFolder();
  await updatePackageJson();
  addAutoSuggestion();
  addExtensions();
  migrate();
  createMarkdownFile();
}
