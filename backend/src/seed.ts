import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Admin } from './auth/entities/admin.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const adminRepository = dataSource.getRepository(Admin);

  const email = 'admin@admin.com';
  const password = 'admin123';

  const existingAdmin = await adminRepository.findOneBy({ email });

  if (existingAdmin) {
    console.log('El administrador ya existe.');
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = adminRepository.create({
      email,
      password: hashedPassword,
      name: 'Administrador Principal',
      role: 'admin',
    });
    await adminRepository.save(newAdmin);
    console.log('Administrador creado con éxito:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  }

  await app.close();
}

bootstrap();
