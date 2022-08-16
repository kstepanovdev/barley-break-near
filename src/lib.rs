use wasm_bindgen::prelude::*;
use rand::thread_rng;
use rand::seq::SliceRandom;

#[wasm_bindgen]
pub fn init_field() -> js_sys::Uint8Array {
    let mut field = (0..=15).collect::<Vec<u8>>();
    field.shuffle(&mut thread_rng());
    
    js_sys::Uint8Array::from(&field[..])
}