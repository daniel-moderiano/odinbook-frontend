import { useAuthContext } from "../hooks/useAuthContext";
import Header from './Header';
import Footer from './Footer';
import Button from './utils/Button'
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { useErrorToast } from '../hooks/useErrorToast';
import { useSuccessToast } from '../hooks/useSuccessToast';

const Settings = () => {
  const { user } = useAuthContext();
  const { deleteAccount, response, loading, error } = useDeleteAccount();

  useErrorToast(error, (error && error.errorMsg));
  useSuccessToast(response, 'Account deleted successfully');

  return (
    <div className="h-full flex flex-col justify-between">
      <Header />
      <main className="mt-[74px] lg:mt-[82px] flex flex-col bg-white shadow-sm p-4 pb-3">
        <h1 className="text-2xl font-bold lg:pb-2 pb-1">Settings</h1>
        <section className="py-4">
          <h2 className="border-b mb-3 pb-2 text-lg">Delete your account</h2>
          <p className="text-sm mb-4">Once you delete your account, it cannot be retrieved. All posts and comments you have made will remain visible to other users.</p>
          <Button customStyles="max-w-[180px]" design="danger" onClick={() => deleteAccount(user._id)}>
            {loading ? (
              'Deleting...'
            ) : (
              'Delete account'
            )}
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Settings