// @ts-ignore
const Me = imports.misc.extensionUtils.getCurrentExtension();

import * as result from 'result';
import * as error from 'error';

const { Gio, GObject } = imports.gi;
const { Ok, Err } = result;
const { Error } = error;

export function block_signal(object: GObject.Object, signal: SignalID) {
    GObject.signal_handler_block(object, signal);
}

export function unblock_signal(object: GObject.Object, signal: SignalID) {
    GObject.signal_handler_unblock(object, signal);
}

export function read_to_string(path: string): result.Result<string, error.Error> {
    const file = Gio.File.new_for_path(path);
    try {
        const [ok, contents,] = file.load_contents(null);
        if (ok) {
            return Ok(imports.byteArray.toString(contents));
        } else {
            return Err(new Error(`failed to load contents of ${path}`));
        }
    } catch (e) {
        return Err(
            new Error(String(e))
                .context(`failed to load contents of ${path}`)
        );
    }
}

export function exists(path: string): boolean {
    return Gio.File.new_for_path(path).query_exists(null);
}
