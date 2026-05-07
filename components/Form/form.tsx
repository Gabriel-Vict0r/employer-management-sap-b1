'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { SeparatorForm } from '../SeparatorForm/separator-form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MultiSelect } from '../MultiSelect/multi-select'
import { useDepartments } from '@/hooks/use-departments'
import { useBranches } from '@/hooks/use-branche'
import { useEmployees } from '@/hooks/use-employee'
import { useCC } from '@/hooks/use-coast-center'
import { Save, X } from 'lucide-react'
import { useUsers } from '@/hooks/use-users';
import { toast } from 'sonner';

const schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'O primeiro nome e obrigatorio.')
    .min(2, 'O primeiro nome deve ter pelo menos 2 caracteres.')
    .max(50, 'O primeiro nome deve ter no maximo 50 caracteres.'),
  middleName: z
    .string()
    .trim()
    .min(1, 'O nome do meio e obrigatorio.')
    .min(2, 'O nome do meio deve ter pelo menos 2 caracteres.')
    .max(50, 'O nome do meio deve ter no maximo 50 caracteres.'),
  lastName: z
    .string()
    .trim()
    .min(1, 'O sobrenome e obrigatorio.')
    .min(2, 'O sobrenome deve ter pelo menos 2 caracteres.')
    .max(50, 'O sobrenome deve ter no maximo 50 caracteres.'),
  seniorID: z.coerce.number().positive('O ID do Senior e obrigatorio.'),
  jobTitle: z
    .string()
    .trim()
    .min(1, 'O cargo e obrigatorio.')
    .min(2, 'O cargo deve ter pelo menos 2 caracteres.')
    .max(20, 'O cargo deve ter no maximo 20 caracteres.'),
  department: z.coerce.number().positive('Selecione um departamento.'),
  branches: z
    .array(z.coerce.number().positive())
    .min(1, 'Selecione ao menos uma filial.'),
  manager: z.coerce.number().positive('Selecione um gerente.'),
  userCode: z
    .coerce.number().nullable(),
  costCenter: z
    .string()
    .trim()
    .min(1, 'Selecione um centro de custos.')
    .min(2, 'O centro de custos deve ter pelo menos 2 caracteres.')
    .max(20, 'O centro de custos deve ter no maximo 20 caracteres.'),
  sexEx: z.enum(['M', 'F', 'E'], {
    message: 'Selecione um sexo.',
  }),
  remark: z
    .string()
    .trim()
    .min(1, 'As observacoes sao obrigatorias.')
    .min(2, 'As observacoes devem ter pelo menos 2 caracteres.')
    .max(255, 'As observacoes devem ter no maximo 255 caracteres.'),
})

export const FormCollaborator = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<z.input<typeof schema>, any, z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      seniorID: '',
      jobTitle: '',
      department: '',
      branches: [],
      manager: '',
      userCode: '',
      costCenter: '',
      sexEx: 'E',
      remark: '',
    },
  })

  async function onSubmit(data: z.output<typeof schema>) {
    console.log('Form data:', data);
    const response = await fetch('/api/sap/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (response.status !== 201) {
      toast.error(`Ocorreu um erro ao tentar cadastrar o colaborador. Status: ${response.status}`)
      return
    }
    toast.success('Colaborador cadastrado com sucesso!')
    form.reset()
  }

  function onInvalid(errors: typeof form.formState.errors) {
    console.log('Form validation errors:', errors)
  }

  const { departments } = useDepartments()
  const { branches } = useBranches()
  const { employees: managers } = useEmployees()

  const { users } = useUsers()
  //console.log('Users:', users);
  const { CC } = useCC()

  const sexOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'E' },
  ]

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">Cadastro Manual de Colaborador</CardTitle>
        <CardDescription>Preencha os dados do colaborador</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="collaborator-form"
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        >
          <SeparatorForm text="Informacoes Pessoais" />

          <div className="flex gap-4 py-4">
            <Field>
              <FieldLabel>Primeiro nome</FieldLabel>
              <Input
                {...form.register('firstName')}
                placeholder="Digite o nome"
              />
              {form.formState.errors.firstName && (
                <FieldError errors={[form.formState.errors.firstName]} />
              )}
            </Field>

            <Field>
              <FieldLabel>Nome do meio</FieldLabel>
              <Input
                {...form.register('middleName')}
                placeholder="Digite o nome do meio"
              />
              {form.formState.errors.middleName && (
                <FieldError errors={[form.formState.errors.middleName]} />
              )}
            </Field>

            <Field>
              <FieldLabel>Sobrenome</FieldLabel>
              <Input
                {...form.register('lastName')}
                placeholder="Digite o sobrenome"
              />
              {form.formState.errors.lastName && (
                <FieldError errors={[form.formState.errors.lastName]} />
              )}
            </Field>
          </div>

          <SeparatorForm text="Informacoes Profissionais" />

          <div className="flex flex-row row-auto gap-4">

            <Field>
              <FieldLabel>ID do Senior</FieldLabel>
              <Input
                {...form.register('seniorID')}
                placeholder="Digite o ID do senior"
              />
              {form.formState.errors.seniorID && (
                <FieldError errors={[form.formState.errors.seniorID]} />
              )}
            </Field>

            <Field>
              <FieldLabel>Cargo</FieldLabel>
              <Input
                {...form.register('jobTitle')}
                placeholder="Digite o cargo reduzido"
              />
              {form.formState.errors.jobTitle && (
                <FieldError errors={[form.formState.errors.jobTitle]} />
              )}
            </Field>
          </div>

          <div className="flex flex-row row-auto gap-4 py-8">
            <Controller
              name="department"
              control={form.control}
              render={({ field }) => (
                <Field className="w-full">
            
                  <MultiSelect
                    field={field}
                    label="Departamento"
                    options={departments.map((department) => ({
                      label: department.Name,
                      value: department.Code.toString(),
                    }))}
                    placeholder="Selecione o departamento"
                  />
                  {form.formState.errors.branches && (
                    <FieldError errors={[form.formState.errors.branches]} />
                  )}
                  {form.formState.errors.department && (
                    <FieldError errors={[form.formState.errors.department]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="branches"
              control={form.control}
              render={({ field }) => (
                <Field className="w-full">
                  <MultiSelect
                    field={field}
                    label="Filiais"
                    options={branches.map((branch) => ({
                      label: branch.Name,
                      value: branch.Code.toString(),
                    }))}
                    placeholder="Selecione as filiais"
                  />
                  {form.formState.errors.branches && (
                    <FieldError errors={[form.formState.errors.branches]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="manager"
              control={form.control}
              render={({ field }) => (
                <Field className="w-full">
                  <MultiSelect
                    field={field}
                    label="Gerente"
                    options={managers.map((manager) => ({
                      label: manager.Name,
                      value: manager.Code.toString(),
                    }))}
                    placeholder="Selecione o gerente"
                  />
                  {form.formState.errors.manager && (
                    <FieldError errors={[form.formState.errors.manager]} />
                  )}
                </Field>
              )}
            />
          </div>

          <SeparatorForm text="Informacoes Adicionais" />

          <div className="flex flex-row row-auto gap-4">
            <Controller
              name="sexEx"
              control={form.control}
              render={({ field }) => (
                <Field className="w-full">
                  <FieldLabel>Sexo</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione">
                        {sexOptions.find((option) => option.value === field.value)
                          ?.label || 'Selecione'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Feminino</SelectItem>
                        <SelectItem value="E">Outro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="costCenter"
              control={form.control}
              render={({ field }) => (
                <Field className="w-full">
                  <FieldLabel>Centro de Custos</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o centro de custos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {CC.map((costCenter) => (
                          <SelectItem
                            key={costCenter.Code}
                            value={costCenter.Code.toString()}
                          >
                            {costCenter.Name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.costCenter && (
                    <FieldError errors={[form.formState.errors.costCenter]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="flex flex-row row-auto gap-4 py-4 w-full">
            <Controller
              name="userCode"
              control={form.control}
              render={({ field }) => (
                <Field className="w-full">
                  <MultiSelect
                    field={field}
                    label="Usuário SAP"
                    options={users.map((user) => ({
                      label: user.Name,
                      value: user.Code.toString(),
                    }))}
                    placeholder="Selecione o usuário"
                  />
                  {form.formState.errors.userCode && (
                    <FieldError errors={[form.formState.errors.userCode]} />
                  )}
                </Field>
              )}
            />
            {/**<Field>
              <FieldLabel>Codigo de Usuario</FieldLabel>
              <Input
                {...form.register('userCode')}
                placeholder="Digite o codigo de usuario"
              />
              {form.formState.errors.userCode && (
                <FieldError errors={[form.formState.errors.userCode]} />
              )}
            </Field>
 */}
            <Field>
              <FieldLabel>Observacoes (cargo completo)</FieldLabel>
              <Input
                {...form.register('remark')}
                placeholder="Digite o cargo completo"
              />
              {form.formState.errors.remark && (
                <FieldError errors={[form.formState.errors.remark]} />
              )}
            </Field>
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal" className="justify-end gap-2 p-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="cursor-pointer p-5"
          >
            <X />
            <span>Limpar</span>
          </Button>

          <Button
            type="submit"
            form="collaborator-form"
            className="cursor-pointer p-5"
          >
            <Save />
            <span>Salvar Colaborador</span>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
