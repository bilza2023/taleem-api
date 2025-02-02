

i need following to fully test the core of api

setup
======
 1: Three user with roles === admin , teacher , student
 2: three tcode documents with type === free,login and paid. (admin can create, i have functions for creating these tcodes)..more details later

----- 

Testing
=======
 Testing is mainly for reading 1 tcode document (since rest routes are easy)
 1 : every one should be able to read file type == free;
 2 : no one should not be able to read file type === login or paid.

 disucss..   
