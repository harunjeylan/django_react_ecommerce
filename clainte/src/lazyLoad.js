import React from "react";

export function lazyLoad(path, namedExport = null) {
  return React.lazy(async () => {
    const promise = import(path);
    if (namedExport === null) {
      console.log(await promise);
      return await promise;
    } else {
      const module = await promise;
      return { default: module[namedExport] };
    }
  });
}
