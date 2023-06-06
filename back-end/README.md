# Getting Started

### PostgreSQL

O banco de dados que será usado é o PostgreSQL

### Variáveis de Ambiente

```DB_USER=nomeUsuario;
DB_URL=jdbc:postgresql://localhost:5432/nomeBanco;
DB_PASSWORD=senha

```

Substitua os valores para que tenha acesso no seu banco de dados local nas variáveis de ambiente, para isso pode criar o arquivo .env dentro da pasta back-end ou, caso esteja utilizando o IntelliJ, no run do Maven.

### Criando Controller da maneira correta

Ao criar um controller, para que seja válida no projeto é necessário que a anotação @RequestMapping esteja assim:

```java
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(value="${API_PREFIX}/*nome_controlador*")
public class entityController {
    //...
}
```

Adicione o ${API_PREFIX} no valor do @RequestMapping toda vez que for necessário criar um controlador novo.
