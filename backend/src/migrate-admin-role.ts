import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Admin } from './auth/entities/admin.entity';

async function migrate() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const adminRepository = dataSource.getRepository(Admin);

  console.log('🔄 Iniciando migración: actualizar rol de admin...\n');

  const email = 'admin@admin.com';

  try {
    const admin = await adminRepository.findOneBy({ email });

    if (!admin) {
      console.log(`❌ No se encontró admin con email: ${email}`);
      await app.close();
      process.exit(1);
    }

    const oldRole = admin.role;
    admin.role = 'admin';
    await adminRepository.save(admin);

    console.log(`✅ Migración completada exitosamente!`);
    console.log(`\n📋 Detalles:`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Nombre: ${admin.name}`);
    console.log(`   Rol anterior: ${oldRole}`);
    console.log(`   Rol nuevo: ${admin.role}`);
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

migrate();
