import bcrypt from 'bcrypt';

export async function passwordMatcher(
  password: string,
  hash: string
): Promise<boolean> {
  console.log(password, hash);
  const isMatched = await bcrypt.compare(password, hash);
  console.log(isMatched);
  return isMatched;
}
