use rand::seq::SliceRandom;
use rand::thread_rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn init_field() -> js_sys::Uint8Array {
    let mut field = (0..=15).collect::<Vec<u8>>();
    field.shuffle(&mut thread_rng());

    js_sys::Uint8Array::from(&field[..])
}

#[wasm_bindgen]
pub fn swap(mut field: Vec<u8>, from: usize, to: usize) -> js_sys::Uint8Array {
    if matches!(from.abs_diff(to), 1 | 4) && [field[to], field[from]].iter().any(|&x| x == 0) {
        field.swap(from, to);
    }

    js_sys::Uint8Array::from(&field[..])
}

#[wasm_bindgen]
pub fn is_solved(field: Vec<u8>) -> bool {
    if field[field.len() - 1] != 0 {
        false
    } else {
        field[0..=15] == (1..15).collect::<Vec<u8>>()
    }
}
