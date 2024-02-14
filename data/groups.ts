import { GroupMemberDTO } from '@/data/groupMembers'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export interface GroupToCreate {
  name: string
  description?: string
  private: boolean
}

export interface GroupDTO {
  id: string
  name: string
  description: string | null
  private: boolean
  createdAt: Date
  updatedAt: Date
}

export interface GroupWithMembersDTO {
  group: GroupDTO
  groupMembers: GroupMemberDTO[]
}

export class Groups {
  static async create(
    groupToCreate: GroupToCreate,
    membersToAdd: string[],
  ): Promise<GroupWithMembersDTO | null> {
    const supabase = createClient(cookies())

    const { data: createdGroup, error: groupCreationError } = await supabase
      .from('groups')
      .insert(groupToCreate)
      .select()
      .maybeSingle()
    if (groupCreationError) {
      console.error(groupCreationError)
      throw groupCreationError
    }
    if (!createdGroup) return null

    const group = {
      id: createdGroup.id,
      name: createdGroup.name,
      description: createdGroup.description,
      private: createdGroup.private,
      createdAt: new Date(createdGroup.created_at),
      updatedAt: new Date(createdGroup.updated_at),
    }
    const groupWithEmptyMembers = { group, groupMembers: [] }
    if (membersToAdd.length === 0) return groupWithEmptyMembers

    const { data: users, error: userSelectionError } = await supabase
      .from('users')
      .select('id')
      .in('email', membersToAdd)
    if (userSelectionError) {
      console.error(userSelectionError)
      throw userSelectionError
    }
    if (users === null) return groupWithEmptyMembers

    const { data: role, error: roleSelectionError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'viewer')
      .maybeSingle()
    if (roleSelectionError) {
      console.error(roleSelectionError)
      throw roleSelectionError
    }
    if (role === null) return groupWithEmptyMembers

    const groupMembersToCreate = users.map((user) => ({
      group_id: group.id,
      user_id: user.id,
      role_id: role.id,
    }))
    const { data: createdGroupMembers, error: groupMemberCreationError } =
      await supabase.from('group_members').insert(groupMembersToCreate).select()
    if (groupMemberCreationError) {
      console.error(groupMemberCreationError)
      throw groupMemberCreationError
    }
    if (!createdGroupMembers) return groupWithEmptyMembers

    return {
      group,
      groupMembers: createdGroupMembers.map((groupMember) => ({
        groupId: groupMember.group_id,
        userId: groupMember.user_id,
        roleId: groupMember.role_id,
        createdAt: new Date(groupMember.created_at),
        updatedAt: new Date(groupMember.updated_at),
      })),
    }
  }
}
