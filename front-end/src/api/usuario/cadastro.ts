/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}

export default handler