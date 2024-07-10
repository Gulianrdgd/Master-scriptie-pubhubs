/*
Copyright 2022 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Needed if we want to use the old OLM encryption

import Olm from "@matrix-org/olm";
// @ts-expect-error: OLM_OPTIONS is not defined in the olm library
import olmWasmPath from "@matrix-org/olm/olm.wasm?url";

// https://gitlab.matrix.org/matrix-org/olm/-/issues/10

// @ts-expect-error: OLM_OPTIONS is not defined in the olm library
window.OLM_OPTIONS = {};

let olmLoaded: Promise<void> | null = null;

/**
 * Loads Olm, if not already loaded.
 */
export const loadOlm = (): Promise<void> =>
    (olmLoaded ??= Olm.init({ locateFile: () => olmWasmPath }));
