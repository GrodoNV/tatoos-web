import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Tattoo } from './tattoos/entities/tattoo.entity';
import { Admin } from './auth/entities/admin.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const tattooRepository = dataSource.getRepository(Tattoo);
  const adminRepository = dataSource.getRepository(Admin);

  // Crear admin
  const email = 'admin@admin.com';
  const password = 'admin123';

  const existingAdmin = await adminRepository.findOneBy({ email });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = adminRepository.create({
      email,
      password: hashedPassword,
      name: 'Administrador Principal',
      role: 'admin',
    });
    await adminRepository.save(newAdmin);
    console.log('✅ Administrador creado:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
  } else {
    console.log('✅ El administrador ya existe.');
  }

  // Crear tatuajes de prueba
  const existingTattoos = await tattooRepository.count();
  if (existingTattoos === 0) {
    const sampleTattoos = [
      {
        title: 'Phoenix Rising',
        style: 'Tradicional',
        description: 'Un majestuoso fénix en rojo y naranja, simbolizando el renacimiento y la transformación.',
        image_url:
          'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=600&fit=crop',
      },
      {
        title: 'Geometric Mandala',
        style: 'Geométrico',
        description: 'Mandala geométrico en blanco y negro con patrones hipnotizantes.',
        image_url:
          'https://images.unsplash.com/photo-1546098953-50d716f4cb4d?w=500&h=600&fit=crop',
      },
      {
        title: 'Watercolor Wolf',
        style: 'Acuarela',
        description: 'Lobo con efectos de acuarela en tonos azules y verdes. Minimalista y moderno.',
        image_url:
          'https://images.unsplash.com/photo-1577720644106-a8d33c3e7a25?w=500&h=600&fit=crop',
      },
      {
        title: 'Sacred Geometry',
        style: 'Minimalista',
        description: 'Diseño sagrado con líneas precisas y simbolismo ancestral.',
        image_url:
          'https://images.unsplash.com/photo-1598462749411-d5e2f9fc3506?w=500&h=600&fit=crop',
      },
      {
        title: 'Black Panther',
        style: 'Realista',
        description: 'Retrato detallado de una pantera negra con ojos penetrantes.',
        image_url:
          'https://images.unsplash.com/photo-1590080876-4b34b4c1e4b5?w=500&h=600&fit=crop',
      },
    ];

    for (const tattooData of sampleTattoos) {
      const tattoo = tattooRepository.create(tattooData);
      await tattooRepository.save(tattoo);
      console.log(`✅ Tatuaje creado: "${tattooData.title}"`);
    }
  } else {
    console.log(`✅ La galería ya contiene ${existingTattoos} tatuajes.`);
  }

  await app.close();
  console.log('\n✨ Seed completado.');
}

bootstrap().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});
