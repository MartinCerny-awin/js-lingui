import os from "os"
import fs from "fs-extra"
import path from "path"

import { mockConfig } from "@lingui/jest-mocks"
import { Catalog, MakeOptions, MakeTemplateOptions, MergeOptions } from "./api/catalog"
import { ExtractedMessageType, MessageType } from "./api/types"

export function copyFixture(fixtureDir) {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), `lingui-test-${process.pid}`)
  )
  if (fs.existsSync(fixtureDir)) {
    fs.copySync(fixtureDir, tmpDir)
  }
  return tmpDir
}

export const defaultMakeOptions: MakeOptions = {
  verbose: false,
  clean: false,
  overwrite: false,
  locale: null,
  prevFormat: null,
  orderBy: "messageId",
}

export const defaultMakeTemplateOptions: MakeTemplateOptions = {
  verbose: false,
  orderBy: "messageId",
}

export const defaultMergeOptions: MergeOptions = {
  overwrite: false,
}

export const makeCatalog = (config = {}) => {
  return new Catalog(
    {
      name: "messages",
      path: "{locale}/messages",
      include: [],
      exclude: [],
    },
    mockConfig(config)
  )
}

export function makePrevMessage(message = {}): MessageType {
  return {
    translation: "",
    ...makeNextMessage(message),
  }
}

export function makeNextMessage(message = {}): ExtractedMessageType {
  return {
    origin: [["catalog.test.ts", 1]],
    obsolete: false,
    ...message,
  }
}
