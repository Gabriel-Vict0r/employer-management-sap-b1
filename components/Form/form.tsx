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
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      colaboratorCode: 0,
      seniorID: 0,
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

   function onSubmit(data: any) {
    console.log(data)
  }

  //const departments = useDepartments();
  //console.log(departments);
  return (
    <Card>

      {/*Cabeçalho*/}
      <CardHeader className='p-4'>
        <CardTitle className='text-'>Cadastro Manual de Colaborador</CardTitle>
        <CardDescription>Preencha os dados do colaborador</CardDescription>
      </CardHeader>

      {/* Conteúdo/Campos */}
      <CardContent>

    <form onSubmit={form.handleSubmit(onSubmit)}>
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
      {/*<Controller 
      name='firstName'
      control={form.control}
      render={({field, fieldState}) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>First Name</FieldLabel>
          <Input {...field}/>

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]}/>
          )}
        </Field>
      )}
      />*/}
      </form>
      </CardContent>


      {/* Rodapé/Submit */}
      <CardFooter>
<Field orientation="horizontal" className='justify-end gap-2'>
          <Button type="button" variant="outline" onClick={() => form.reset()} className='cursor-pointer'>
            Limpar
          </Button>
          <Button type="submit" form="form-rhf-demo" className='cursor-pointer hover:bg-chart-2' onClick={() => form.handleSubmit(onSubmit)()}>
            Salvar Colaborador
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}