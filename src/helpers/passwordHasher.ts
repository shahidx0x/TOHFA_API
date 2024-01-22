import bcrypt from 'bcrypt';

export async function passwordHaser(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  return hashedPassword;
}
