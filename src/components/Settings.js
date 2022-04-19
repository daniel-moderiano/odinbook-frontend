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

  // Set up notifications
  useErrorToast(error, (error && error.errorMsg));
  useSuccessToast(response, 'Account deleted successfully');

  return (
    <div className="h-full flex flex-col justify-between items-center">
      <Header />
      <main className="mt-[74px] lg:mt-[82px] flex flex-col bg-white shadow-sm p-4 pb-3 md:p-6 md:pb-4 max-w-[640px] lg:max-w-3xl">
        <h2 className="text-2xl font-bold lg:pb-2 pb-1">Settings</h2>
        <section className="py-4">
          <h2 className="border-b mb-3 pb-2 text-lg">Delete your account</h2>
          <p className="text-sm mb-4">Once you delete your account, it cannot be retrieved. All traces of you will be removed from odinbook, including likes, comments, and posts. Proceed with caution.</p>
          <Button customStyles="max-w-[180px]" design="danger" hasPopup="dialog" onClick={() => {
            deleteAccount(user._id);
          }} disabled={user._id === '6253eafa7c5f03b0906cc7b5'}>
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