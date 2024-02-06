import { DocumentBuilder } from "@nestjs/swagger"

export class ConfigService {
    currentConfig;

    constructor(){
        const ENV = process.env?.NODE_ENV || 'local';
        
        this.currentConfig = {
            envFilePath: `config/.env.${ENV}`,
            isGlobal: true,
         }
    }

    getConfig() {
       return this.currentConfig
    }

    getSwaggerConfig() {
        return new DocumentBuilder() // это конфигурация документа
        .setTitle("Posts")
        .setDescription("CRUD posts API")
        .setVersion("1.0")
        .addTag("API")
        .build();
    }
}

//isGlobal: true, - чтобы не импортировать ConfigModule.forRoot() в каждый модуль. Если мы хотим 