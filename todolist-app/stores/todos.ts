import type { APIResponse, ITodo } from "~/types";
import { defineStore } from "pinia";

type APIResponseWithData = APIResponse & { data: ITodo[] };

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [] as ITodo[],
  }),
  actions: {
    async getTodos() {
      try {
        const response = await $fetch<APIResponseWithData>(
          "/api/todos?today=true",
        );

        this.todos = response.data;
        console.log(response);
        return response.statusMessage;
      } catch (error) {
        console.error(error);
        return "Failed to fetch data";
      }
    },
    async addTodo(todoName: string) {
      try {
        const response = await $fetch<APIResponse>("/api/todos", {
          method: "POST",
          body: JSON.stringify({ name: todoName }),
        });
        console.log(response);
        // await this.getTodos();
      } catch (error) {
        console.error(error);
      }
    },
    async updateTodo(
      updatedTodo: {
        name: string;
        content: string;
        dueDate: string;
        priority: number;
      },
      todoId: string,
    ) {
      try {
        const response = await $fetch<APIResponse>(`/api/todos/${todoId}`, {
          method: "PUT",
          body: JSON.stringify(updatedTodo),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.statusMessage);
        return response.statusMessage;
      } catch (error) {
        console.error(error);
      }
    },
    async changeTodoStatus(todoId: string) {
      try {
        const response = await $fetch<APIResponse>(`/api/todos/${todoId}`, {
          method: "PATCH",
        });
        console.log(response);
        await this.getTodos();
        return response;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    async deleteTodo(todoId: string) {
      try {
        const response = await $fetch<APIResponse>(`/api/todos/${todoId}`, {
          method: "DELETE",
        });
        console.log(response);
        await this.getTodos();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
