'use client'

import { AlertError, AlertInfo } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelect, OptionType } from '@/components/ui/multiselect'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserDTO } from '@/data/users'
import { createGroup, searchUsers } from '@/lib/actions'
import { createGroupSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface CreateGroupFormProps {
  user: UserDTO
}

export function CreateGroupForm({ user }: CreateGroupFormProps) {
  const [state, action] = useFormState(createGroup, {})
  const form = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      accessLevel: 'private',
      members: [],
    },
  })

  const [memberOptions, setMemberOptions] = useState<OptionType[]>([])
  const transformUserDTOsToOptions = useCallback(
    (users: UserDTO[] | null) =>
      users
        ?.filter((current) => current.id !== user.id)
        ?.map((user) => ({
          value: user.email,
          label: user.email,
        })) ?? [],
    [user.id],
  )
  const [isUninitiated, setIsUninitiated] = useState(true)

  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Create a new group
      </h1>
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Get started by giving your group a name, optionally setting a
          description and adding members
        </p>
        <div className="flex items-center space-x-2">
          <div>
            <Image
              className="rounded-full bg-primary"
              src={user.avatarUrl ?? '/avatar.svg'}
              alt="Placeholder avatar"
              width={40}
              height={40}
              priority={true}
            />
          </div>
          <div>
            <p className="text-sm">{user.email}</p>
            <p className="text-sm text-muted-foreground">Admin</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(action)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your group name"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group description (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Describe your group"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accessLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>View access level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="accessLevel"
                  >
                    <FormControl>
                      <SelectTrigger aria-label={'View access level'}>
                        <SelectValue placeholder="Determine view access" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    When your group is public, anyone with the link can view
                    your memories. Only members can contribute. When your group
                    is private, only members can view and contribute.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Members</FormLabel>
                  <MultiSelect
                    selected={field.value}
                    options={memberOptions}
                    {...field}
                    className="sm:w-[510px]"
                    placeholder="Add members"
                    onSearch={async (
                      data: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                      const searchedUsers = await searchUsers(data.target.value)
                      setMemberOptions(
                        transformUserDTOsToOptions(searchedUsers),
                      )
                      setIsUninitiated(false)
                    }}
                    isUninitiated={isUninitiated}
                    label="Members"
                    ref={null}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create group
            </Button>
          </form>
        </Form>
        {state.message &&
          (state.type === 'info' ?
            <AlertInfo heading="Success!" message={state.message} />
          : <AlertError message={state.message} />)}
      </div>
    </div>
  )
}
