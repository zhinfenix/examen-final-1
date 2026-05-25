export const EmptyState = ({ message = "No se encontraron dragones" }: { message?: string }) => {
   return (
<div className="text-center text-gray-500 py-20">
<p className="text-2xl font-semibold">{message}</p>
</div>
);
};//sahur