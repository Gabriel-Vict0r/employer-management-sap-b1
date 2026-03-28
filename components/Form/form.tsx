import { useFormState, useForm } from 'react-dom';
import * as z from 'zod'
const schema = z.object({
    firstName: z.string().min(2).max(50),
    middleName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    colaboratorCode: z.int().positive(),
    seniorID: z.int().positive(),
    jobTitle: z.string().min(2).max(20),
    department: z.int().positive(),
    branches: z.array(z.int().positive()).min(1),
    manager: z.int().positive(),
    userCode: z.string().min(2).max(20),
    costCenter: z.string().min(2).max(20),
    sexEx: z.enum(['M', 'F', 'E']),
    remark: z.string().min(2).max(255).nonempty(),
  });
export const FormCollaborator = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      colaboratorCode: undefined,
      seniorID: undefined,
      jobTitle: '',
      department: undefined,
      branches: [],
      manager: undefined,
      userCode: '',
      costCenter: '',
      sexEx: 'E',
      remark: '',
    }
  });

  return (
    <div></div>
  )
}