'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
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
 console.log(branches);
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
          <Input {...form.register('jobTitle')} placeholder='Digite o cargo'/>
          {form.formState.errors.jobTitle && (
            <FieldError errors={[form.formState.errors.jobTitle]}/>
          )}
        </Field>
      </div>
        
        <div className='flex flex-row row-auto gap-4 py-4'>
          <Controller 
        name='department'
        control={form.control}
        render={({field, fieldState}) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Departamento</FieldLabel>
            <Select
              {...field}
              onValueChange={field.onChange}
            >
              
              <SelectTrigger>
                <SelectValue placeholder="Selecione um departamento">
                  {departments.find((dept) => dept.Code.toString() === field.value)?.Name || "Selecione um departamento"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                {departments.map((dept) => (
                  <SelectItem key={dept.Code} value={dept.Code.toString()}>
                    {dept.Name}
                  </SelectItem>
                ))}
                  </SelectGroup>
              </SelectContent>
            </Select>

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]}/>
            )}
          </Field>
        )}
        />

         <Controller
          name="branches"
          control={form.control}
          render={({ field }) => (
            <MultiSelect
              field={field}
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
              options={managers.map((f) => ({
                label: f.Name,
                value: f.Code.toString(),
              }))}
              placeholder="Selecione o gerente"
            />
          )}
        />
        </div>

      </form>
      </CardContent>


      {/* Rodapé/Submit */}
      <CardFooter>
<Field orientation="horizontal" className='justify-end gap-2'>
          <Button type="button" variant="outline" onClick={() => form.reset()} className='cursor-pointer'>
            Limpar
          </Button>
          <Button type="submit" form="collaborator-form" className='cursor-pointer hover:bg-chart-2'>
            Salvar Colaborador
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}