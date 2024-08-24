import type { APIResponse, IGroup } from "~/types";

type APIResponseWithData = APIResponse & { data: IGroup[] };

export const useGroupStore = defineStore("group", {
  state: () => ({
    groups: [] as IGroup[],
    group: {} as IGroup,
  }),
  actions: {
    setGroups(groups: IGroup[]) {
      this.groups = groups;
    },
    async getGroups() {
      try {
        const response = await $fetch<APIResponseWithData>("/api/group");

        this.groups = response.data;
        return response.statusMessage;
      } catch (error) {
        console.error(error);
      }
    },
    async getGroupTodos(id: string) {
      try {
        const response = await $fetch<APIResponseWithData>(`/api/group/${id}`);
        console.log(response.data);
        this.group = response.data[0];
        return response.statusMessage;
      } catch (error) {
        console.error(error);
      }
    },
    async addGroup(groupName: string) {
      try {
        const response = await $fetch<APIResponse>("/api/group", {
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
        const response = await $fetch<APIResponse>(`/api/group/${groupId}`, {
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
        const response = await $fetch<APIResponse>(`/api/group/${groupId}`, {
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
        const response = await $fetch<APIResponse>(`/api/group/${groupId}`, {
          method: "DELETE",
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
