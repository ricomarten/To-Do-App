# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# To-Do API Endpoints

| Endpoint         | Method | Description                                      | Body Request             | Body Response           |
|------------------|--------|--------------------------------------------------|--------------------------|-------------------------|
| `/todos`         | GET    | Retrieve all To-Do items                         | -                        | List of To-Do items     |
| `/todos`         | POST   | Create a new To-Do item                          | `{"text": "todo text", "isCompleted": false}` | Created To-Do item with ID |
| `/todos/{todo_id}` | GET    | Retrieve a To-Do item by ID                       | -                        | To-Do item with ID      |
| `/todos/{todo_id}` | PUT    | Update a To-Do item by ID                         | `{"text": "todo text", "isCompleted": true/false}` | Updated To-Do item with ID |
| `/todos/{todo_id}` | DELETE | Delete a To-Do item by ID                         | -                        | Confirmation message    |
| `/todos/filter`  | GET    | Retrieve To-Do items filtered by completion status | Query parameter `isCompleted` | Filtered list of To-Do items |

