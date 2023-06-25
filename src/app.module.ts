import { ConfigModule } from "@nestjs/config";

const configModule = ConfigModule.forRoot({
  envFilePath: [".env.local", ".env"]
});
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsModule } from "./products/products.module";

@Module({
  imports: [
    CqrsModule,
    configModule,
    ProductsModule,
    TypeOrmModule.forRoot({
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        autoLoadEntities: true,
        synchronize: true
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}