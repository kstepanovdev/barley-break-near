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
        let answer = (1..=15).collect::<Vec<u8>>();
        field[0..=14] == answer[..]
    }
}

#[cfg(test)]

#[test]
fn puzzle_is_solved() {
    let mut field = (1..=15).collect::<Vec<u8>>();
    field.push(0);

    assert!(is_solved(field));
}

#[test]
fn puzzle_solved_incorrectly() {
    let mut field = (1..=14).collect::<Vec<u8>>();
    field.push(0);
    field.push(15);

    assert!(!is_solved(field));
}