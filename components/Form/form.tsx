'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { SeparatorForm } from '../SeparatorForm/separator-form';
import { useDepartments } from '@/hooks/use-departments';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Department } from '@/interfaces/departments';
import { MultiSelect } from '../MultiSelect/multi-select';
import { useBranches } from '@/hooks/use-branche';
import { useEmployees } from '@/hooks/use-employee';
import { useCC } from '@/hooks/use-coast-center';
import { Save, X } from 'lucide-react';

const schema = z.object({
    firstName: z.string().min(2).max(50),
    middleName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
colaboratorCode: z.coerce.number().positive(),
    seniorID: z.coerce.number().positive(),
    jobTitle: z.string().min(2).max(20),
    department: z.coerce.number().positive(),
    branches: z.array(z.coerce.number().positive()).min(1),
    manager: z.coerce.number().positive(),
    userCode: z.string().min(2).max(20),
    costCenter: z.string().min(2).max(20),
    sexEx: z.enum(['M', 'F', 'E']),
    remark: z.string().min(2).max(255).nonempty(),
  });
export const FormCollaborator = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<z.input<typeof schema>, any, z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      colaboratorCode: '',
      seniorID: '',
      jobTitle: '',
      department: 0,
      branches: [],
      manager: 0,
      userCode: '',
      costCenter: '',
      sexEx: 'E',
      remark: '',
    }
  });

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   function onSubmit(data: any) {
    console.log(data)
  }

  const returnDepartments = useDepartments();
 const departments = returnDepartments.departments;
 
 const returnBranches = useBranches();
 const branches = returnBranches.branches;
 
 const returnManagers = useEmployees();
 const managers = returnManagers.employees;

 const returnCC = useCC(); 
 const CC = returnCC.CC;

 const sexOptions = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' },
  { label: 'Outro', value: 'E' },
];
 console.log(CC);
  return (
    <Card>

      {/*Cabeçalho*/}
      <CardHeader className='p-4'>
        <CardTitle className='text-xl'>Cadastro Manual de Colaborador</CardTitle>
        <CardDescription>Preencha os dados do colaborador</CardDescription>
      </CardHeader>

      {/* Conteúdo/Campos */}
      <CardContent>

    <form onSubmit={form.handleSubmit(onSubmit)} id="collaborator-form">
      <SeparatorForm  text="Informações Pessoais"/>
      <div className='flex gap-4 py-4'>
      <Field>
        <FieldLabel>Primeiro nome</FieldLabel>
        <Input {...form.register('firstName')} placeholder='Digite o nome'/>
        {form.formState.errors.firstName && (
          <FieldError errors={[form.formState.errors.firstName]}/>
        )}
      </Field>
      <Field>
        <FieldLabel className='text'>Nome do meio</FieldLabel>
        <Input {...form.register('middleName')} placeholder='Digite o nome do meio' className='p'/>
        {form.formState.errors.middleName && (
          <FieldError errors={[form.formState.errors.middleName]}/>
        )}
      </Field>
      <Field>
        <FieldLabel>Sobrenome</FieldLabel>
        <Input {...form.register('lastName')} placeholder='Digite o sobrenome'/>
        {form.formState.errors.lastName && (
          <FieldError errors={[form.formState.errors.lastName]}/>
        )}
      </Field>
            </div>
      
        <SeparatorForm  text="Informações Profissionais"/>
      <div className='flex flex-row row-auto gap-4'>
        <Field>
          <FieldLabel>Código do Colaborador</FieldLabel>
          <Input {...form.register('colaboratorCode')} placeholder='Digite o código do colaborador'/>
          {form.formState.errors.colaboratorCode && (
            <FieldError errors={[form.formState.errors.colaboratorCode]}/>
          )}
        </Field>
        <Field>
          <FieldLabel>ID do Senior</FieldLabel>
          <Input {...form.register('seniorID')} placeholder='Digite o ID do senior'/>
          {form.formState.errors.seniorID && (
            <FieldError errors={[form.formState.errors.seniorID]}/>
          )}
        </Field>
        <Field>
          <FieldLabel>Cargo</FieldLabel>
          <Input {...form.register('jobTitle')} placeholder='Digite o cargo reduzido'/>
          {form.formState.errors.jobTitle && (
            <FieldError errors={[form.formState.errors.jobTitle]}/>
          )}
        </Field>
      </div>
        
        <div className='flex flex-row row-auto gap-4 py-8'>
        
        <Controller
          name="department"
          control={form.control}
          render={({ field }) => (
            <MultiSelect
              field={field}
              label='Departamento'
              options={departments.map((f) => ({
                label: f.Name,
                value: f.Code.toString(),
              }))}
              placeholder="Selecione o departamento"
            />
          )}
        />

         <Controller
          name="branches"
          control={form.control}
          render={({ field }) => (
            <MultiSelect
              field={field}
              label='Filiais'
              options={branches.map((f) => ({
                label: f.Name,
                value: f.Code.toString(),
              }))}
              placeholder="Selecione as filiais"
            />
          )}
        />
        
        
        <Controller
          name="manager"
          control={form.control}
          render={({ field }) => (
            <MultiSelect
              field={field}
              label='Gerente'
              options={managers.map((f) => ({
                label: f.Name,
                value: f.Code.toString(),
              }))}
              placeholder="Selecione o gerente"
            />
          )}
        />
        </div>
          <SeparatorForm  text="Informações Adicionais"/>
          <div className='flex flex-row row-auto gap-4'>
            <Controller
        name="sexEx"
        control={form.control}
        render={({ field }) => (
          <Field className="w-full">
            <FieldLabel>Sexo</FieldLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione">
                 {sexOptions.find(option => option.value === field.value)?.label || 'Selecione'}
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
            <MultiSelect
              field={field}
              label='Centro de Custos'
              options={CC.map((f) => ({
                label: f.Name,
                value: f.Code.toString(),
              }))}
              placeholder="Selecione o centro de custos"
            />
          )}
        />
          </div>

          <div className='flex flex-row row-auto gap-4 py-4 w-full'>
          <Field>
            <FieldLabel>Código de Usuário</FieldLabel>
            <Input {...form.register('firstName')} placeholder='Digite o código de usuário'/>
            {form.formState.errors.firstName && (
              <FieldError errors={[form.formState.errors.firstName]}/>
            )}
          </Field>
      <Field>
        <FieldLabel>Observações (cargo coompleto)</FieldLabel>
        <Input {...form.register('firstName')} placeholder='Digite o cargo completo'/>
        {form.formState.errors.firstName && (
          <FieldError errors={[form.formState.errors.firstName]}/>
        )}
      </Field>
      </div>
      </form>
      </CardContent>


      {/* Rodapé/Submit */}
      <CardFooter>
<Field orientation="horizontal" className='justify-end gap-2 p-2'>
          <Button type="button" variant="outline" onClick={() => form.reset()} className='cursor-pointer p-5'>
            <X />
            <span>Limpar</span>
          </Button>
          <Button type="submit" form="collaborator-form" className='cursor-pointer p-5'>
            <Save />
            <span>Salvar Colaborador</span>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}