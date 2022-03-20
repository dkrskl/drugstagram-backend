import { PrismaClient } from '@prisma/client';
import { Chance } from 'chance';

const chance = new Chance();
const prisma = new PrismaClient();

const log = (message: string) =>
	console.log('\x1b[32m%s\x1b[0m', `✔ ${message}`);

async function seed() {
	log('Resetting & Seeding...');
	await prisma.drug.deleteMany();
	await prisma.disease.deleteMany();

	log('Seeding Drugs');
	const drugs = [];
	for (let i = 0; i < 64; i++) {
		const drug = await prisma.drug.create({
			data: {
				description: chance.sentence(),
				name: chance.word({ capitalize: true }),
				released: chance.date(),
			},
		});

		drugs.push(drug);
	}

	log('Seeding Diseases');
	for (let i = 0; i < 64; i++) {
		await prisma.disease.create({
			data: {
				name: chance.word({ capitalize: true }),
				drugId: chance.pickone(drugs).id,
			},
		});
	}

	log('Seeding is complete!');
}

seed()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
