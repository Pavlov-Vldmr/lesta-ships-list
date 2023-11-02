# Корабли
![Снимок экрана 2023-11-02 135719](https://github.com/Pavlov-Vldmr/lesta-ships-list/assets/72386678/da21319f-d1aa-4c9c-959a-2d8cf3ccd7bb)

- [Navigation](#markdown-navigation) 
    - [Start project](#start-project)
    - [Как можно улучшить](#how-to-improve)
    - [Table mode](#table-mode)
    - [Resources](#resources)

[Tools and Technologies Used](#tools-and-technologies-used)
## Task
Разработать страницу с отображением всех кораблей игры «Мир Кораблей». Пользователь должен иметь возможность посмотреть на странице основные параметры корабля: название, класс, нация, уровень, описание, изображение и отфильтровать корабли по уровню, нации и классу.

Необходимые данные можно получить выполнив GraphQL запрос к [API](https://vortex.korabli.su/api/graphql/glossary/).

[Как можно улучшить](#how-to-improve)
```graphql
{
  vehicles {
    title
    description
    icons {
      large
      medium
    }
    level
    type {
      name
    	title
      icons {
        default
      }
    }
    nation {
      name
      title
      color
      icons {
        small
        medium
        large
      }
    }
  }
}
```

## Start project
### `https://github.com/Pavlov-Vldmr/lesta-ships-list.git`
Clone git repository to local

### `npm install`
Installs a package and any packages that it depends on. 

### `npm start`

Runs the app.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## How to improve
- Подписаться на обновление. Если при смене страницы данные на сервере изменились.
- Добавить множественную сортировку.
- Сделать декомпозицию генирации таблицы.
- Минимализировать ts код
- React.memo
- Кэширование
- Использовать Appolo. Позволит избежать лишних запросов.  Апдейт данных в кэше.


## Table mode
![Снимок экрана 2023-11-02 140205](https://github.com/Pavlov-Vldmr/lesta-ships-list/assets/72386678/cfb2b728-ff42-4677-a44b-ea9e3140f8c8)

## Resources
- [React](https://react.dev/reference/react)
- [Sass](https://sass-lang.com)
- [Graphql](https://graphql.org)
- [Chakra-ui](https://chakra-ui.com)
- [TanStack Table](https://tanstack.com/table/v8)
