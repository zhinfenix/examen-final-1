export const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className="text-center text-red-500 py-20">
 <i className="fas fa-exclamation-triangle text-5xl mb-4"></i>
    <p className="text-xl font-bold">{message}   </p>  </div>
    );
};//tun tun sahur