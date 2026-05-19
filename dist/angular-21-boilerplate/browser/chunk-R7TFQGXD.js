function l(n,u){return t=>{let e=t.get(n),r=t.get(u);return!e||!r||r.errors&&!r.errors.mustMatch||(e.value!==r.value?r.setErrors({mustMatch:!0}):r.setErrors(null)),null}}export{l as a};
