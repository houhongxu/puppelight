# README

esm导入需要.js后缀
cjs导入自动找.js其次.ts

"moduleResolution": "Node" 使用cjs，并使用cjs兼容esm的方式
"moduleResolution": "Node16",使用esm导入esm

使用esm新特性如import.meta时，就不能用Node兼容，而是需要Node16
