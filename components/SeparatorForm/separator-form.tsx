import { Separator } from "../ui/separator"


export const SeparatorForm = ({text}: {text: string}) => {

  return (
 <div className="space-y-6">
  <div className="flex items-start gap-4 pb-8 pt-4 flex-col">
    <h3 className="text-lg font-semibold whitespace-nowrap">
      {text}
    </h3>
    <Separator className="" />
  </div>

  {/* Inputs aqui */}
</div>)
}