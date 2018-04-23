// export function act<T>(this: T, actor: (acted: T) => void): T {
//     actor(this);
//     return this;
// }

// declare global {
//     interface Object {
//         act<T>(this: T, actor: (acted: T) => void): T;
//     }
// }

// Object.prototype.act = act;