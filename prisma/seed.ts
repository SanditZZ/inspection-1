import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const standards = [
  {
    id: "1",
    name: "มาตรฐานข้าวชั้น 1",
    createDate: "2022-02-23T15:47:19+07:00",
    standardData: [
      {
        conditionMax: "LT",
        conditionMin: "GT",
        key: "wholegrain",
        name: "ข้าวเต็มเมล็ด",
        shape: ["wholegrain", "broken"],
        maxLength: 99,
        minLength: 7,
      },
      {
        conditionMax: "LT",
        conditionMin: "GT",
        key: "broken_rice1",
        name: "ข้าวหักใหญ่",
        shape: ["wholegrain", "broken"],
        maxLength: 7,
        minLength: 3.5,
      },
      {
        conditionMax: "LT",
        conditionMin: "GT",
        key: "broken_rice2",
        shape: ["wholegrain", "broken"],
        name: "ข้าวหักทั่วไป",
        maxLength: 3.5,
        minLength: 0,
      },
    ],
  },
  {
    id: "2",
    name: "มาตรฐานข้าวชั้น 2",
    createDate: "2023-02-25T17:40:11+07:00",
    standardData: [
      {
        conditionMax: "LT",
        conditionMin: "GT",
        key: "wholegrain",
        name: "ข้าวเต็มเมล็ด",
        shape: ["wholegrain", "broken"],
        maxLength: 99,
        minLength: 6,
      },
      {
        conditionMax: "LT",
        conditionMin: "GT",
        key: "broken_rice1",
        shape: ["wholegrain", "broken"],
        name: "ข้าวหักใหญ่",
        maxLength: 6,
        minLength: 4.5,
      },
      {
        conditionMax: "LT",
        conditionMin: "GT",
        key: "broken_rice2",
        shape: ["wholegrain", "broken"],
        name: "ข้าวหักทั่วไป",
        maxLength: 4.5,
        minLength: 0,
      },
    ],
  },
];

async function main() {
  // Seed standards
  for (const standard of standards) {
    await prisma.standard.upsert({
      where: { id: standard.id },
      update: {
        name: standard.name,
        createDate: standard.createDate,
        standardData: standard.standardData,
      },
      create: {
        id: standard.id,
        name: standard.name,
        createDate: standard.createDate,
        standardData: standard.standardData,
      },
    });
  }
}

main()
  .then(() => {
    console.log("Database seeded!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
