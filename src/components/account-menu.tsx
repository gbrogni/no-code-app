import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogClose, DialogContent, DialogTrigger } from './ui/dialog';

export function AccountMenu() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <LogOut className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <p>Você tem certeza que deseja sair?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <Button asChild variant="default">
                        <a href="/api/auth/sign-out">Confirmar</a>
                    </Button>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}