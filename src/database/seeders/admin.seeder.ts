// src/database/seeders/admin-seeder.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ROLES } from '../../constants/role';

const prisma = new PrismaClient();

export async function seedAdmin() {
    try {
        console.log('🌱 Starting admin seeder...');

        // Check if admin already exists
        const existingAdmin = await prisma.user.findFirst({
            where: { role: ROLES.ADMIN }
        });

        if (existingAdmin) {
            console.log('✅ Admin user already exists, skipping...');
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD || 'admin123456',
            12
        );

        // Create admin user
        const adminUser = await prisma.user.create({
            data: {
                email: process.env.ADMIN_EMAIL || 'admin@example.com',
                password: hashedPassword,
                name: process.env.ADMIN_NAME || 'System Administrator',
                phone: process.env.ADMIN_PHONE || '+1234567890',
                role: ROLES.ADMIN,
                isVerified: true, // Admin should be pre-verified
            },
        });

        console.log('✅ Admin user created successfully:');
        console.log(`   Email: ${adminUser.email}`);
        console.log(`   Name: ${adminUser.name}`);
        console.log(`   Role: ${adminUser.role}`);
        console.log(`   ID: ${adminUser.id}`);

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        throw error;
    }
}

export async function removeAdmin() {
    try {
        console.log('🗑️  Removing admin users...');

        const result = await prisma.user.deleteMany({
            where: { role: ROLES.ADMIN }
        });

        console.log(`✅ Removed ${result.count} admin user(s)`);
    } catch (error) {
        console.error('❌ Error removing admin users:', error);
        throw error;
    }
}