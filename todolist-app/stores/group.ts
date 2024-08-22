import type { APIResponse, IGroup } from "~/types";

type APIResponseWithData = APIResponse & { data: IGroup[] };

export const useGroupStore = defineStore("group", {
  state: () => ({
    groups: [] as IGroup[],
  }),
  actions: {
    async getGroups() {
      try {
        const response = await $fetch<APIResponseWithData>("/api/groups");

        this.groups = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addGroup(groupName: string) {
      try {
        const response = await $fetch<APIResponse>("/api/groups", {
          method: "POST",
          body: JSON.stringify({ name: groupName }),
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async updateGroupName(updatedGroup: string, groupId: string) {
      try {
        const response = await $fetch<APIResponse>(`/api/groups/${groupId}`, {
          method: "PUT",
          body: JSON.stringify({ name: updatedGroup }),
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async addTodoToGroup(todoId: string, groupId: string) {
      try {
        const response = await $fetch<APIResponse>(`/api/groups/${groupId}`, {
          method: "PATCH",
          body: JSON.stringify({ id: todoId }),
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteGroup(groupId: string) {
      try {
        const response = await $fetch<APIResponse>(`/api/groups/${groupId}`, {
          method: "DELETE",
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
