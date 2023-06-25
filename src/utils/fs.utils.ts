import fs, { readFile, writeFile, mkdir, exists, unlink } from "node:fs";
import path, { dirname, join } from "node:path";
import * as fsExtra from "fs-extra";

export const readTextFileAsync = (path: string) => {
  return new Promise((res, rej) => {
    const rootDirPath = makeRootPath(__dirname);
    const filePath = join(rootDirPath, path);

    readFile(filePath, { encoding: "utf-8" },
      (err, data) => {
        if (err) {
          console.log(err);
          rej();
        }
        res(data);
      });
  });
};

export const readFileAsync = (path: string) => {
  return new Promise((res, rej) => {
    const rootDirPath = makeRootPath(__dirname);
    const filePath = join(rootDirPath, path);

    readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        rej();
      }
      res(data);
    });
  });
};

export const saveFileAsync = (path: string, data: Buffer) => {
  return new Promise<void>((res, rej) => {
    const rootDirPath = makeRootPath(__dirname);
    const filePath = join(rootDirPath, path);

    writeFile(filePath, data, (err) => {
      if (err) {
        console.log(err);
        rej();
      }
      res();
    });
  });
};

export const unlinkFileAsync = (path: string) => {
  return new Promise<void>((res, rej) => {
    const rootDirPath = makeRootPath(__dirname);
    const filePath = join(rootDirPath, path);

    unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        rej();
      }
      res();
    });
  });
};

export const emptyDirAsync = (path: string) => {
  return new Promise<void>((res, rej) => {
    const rootDirPath = makeRootPath(__dirname);
    const filePath = join(rootDirPath, path);

    fsExtra.emptyDir(filePath, (err) => {
      if (err) {
        console.log(err);
        rej();
      }
      res();
    });
  });
};

export const makeDirAsync = (path: string) => {
  return new Promise<void>((res, rej) => {
    const rootDirPath = makeRootPath(__dirname);
    const filePath = join(rootDirPath, path);
    mkdir(filePath, { recursive: true }, (err) => {
      if (err) rej();
      res();
    });
  });
};

export const existDirAsync = (path: string) => {
  return new Promise((res, rej) => {
    const rootDirPath = makeRootPath(__dirname);
    const filePath = join(rootDirPath, path);

    exists(filePath, (isExist) => {
      if (isExist) res(true);
      else res(false);
    });
  });
};

export const makeRootPath = (rawPath: string) => {
  const rootPathArr = rawPath.split("\\");
  const newRootArrPath = [];
  for (let el of rootPathArr) {
    if (el === "src") break;
    newRootArrPath.push(el);
  }
  return newRootArrPath.join("\\");
};
