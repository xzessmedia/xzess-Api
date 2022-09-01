import s from 'shelljs';

s.rm('-rf', './node_modules/@prisma/client');
s.exec('prisma db pull');
s.exec('prisma generate');