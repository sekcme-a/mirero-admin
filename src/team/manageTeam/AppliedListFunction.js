import { firestore as db } from "firebase/firebase"

export const FUNCTION = {
  give_authority: async (teamId, uid) => {
    const batch = db.batch()
    const doc = await db.collection("team_admin").doc(teamId).get()
    const userDoc = await db.collection("user").doc(uid).get()
    batch.update(db.collection("team_admin").doc(teamId), {users: [...doc.data().users, uid]})
    batch.update(db.collection("user").doc(uid), {roles: [...userDoc.data().roles, `${teamId}_admin`]})
    batch.delete(db.collection("team").doc(teamId).collection("application").doc(uid))
    batch.commit()
  },
  
  decline_authority: async (teamId, uid) => {
    await db.collection("team").doc(teamId).collection("application").doc(uid).delete()
  }
}