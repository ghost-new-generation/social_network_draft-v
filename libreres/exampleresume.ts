export interface users{
  User_id:number,
  User_LastName:string,
  User_FirstName:string,
  User_Password:string,
  User_Email:string,
  Date_of_creation:string,
  User_Status:string,
  roles_id: number,
  roles_title:string,
  genders_id:number,
  genders_title:string,
  User_IMG:string,
  CountFriend:number,
  CountPicture:number,
  Date_of_birth:string
}
export interface comment{
  Users_id: number,
  Content: string,
  Date_of_create: string,
  User_LastName:string,
  User_FirstName:string,
  User_IMG:string,
  CommentPost_id:number
}
export interface post{
  Post_id:number,
  Title_post:string,
  Date_of_create:string,
  Content_post:number,
  Users_id:number,
  User_LastName:string,
  User_FirstName:string,
  User_IMG:string,
  Post_IMG:string,
  countLike: number
}
export interface messages{
  Messages_id:number,
  To_User_id:number,
  Content:string,
  Time_of_create:string,
  From_User_id:number,
  User_LastName:string,
  User_FirstName:string,
  Dialog_id:number,
  Edit_Messages: number,
  Viewed_Messages:number
}
export interface dialog{
  DialogID:number,
  UserID:number,
  User_LastName:string,
  User_FirstName:string,
  User_IMG:string,
  CodeDialog:number,
  Content:string,
  Time_of_create:string,
  Viewed_Messages:number,
  To_User_id:number,
  From_User_id:number,
}
export interface friends{
  Users_id:number,
  Friend_id:number,
  User_LastName:string,
  User_FirstName:string,
  time_of_create:string,
  User_IMG:string
  User_Applications:string
}
export interface gallery{
  Gallery_id:number,
  Images_id:number,
  Name_Image:string,
  User_LastName:string,
  User_FirstName:string,
}
export interface community{
  Community_id:number,
  User_id:number,
  Title_community:string,
  Time_of_create:string,
  Description_community:string,
  IMG_community:string
}
export interface notification{
  Notification_id:number,
  Notification_content:string,
  Date_of_create:string,
  Title_community:string,
  User_LastName:string,
  User_FirstName:string,
  Community_id:number,
  User_id:number,
  From_Users_id:number,
  Count:number,
  User_IMG:string,
}
export interface blackList{
  User_LastName:string,
  User_FirstName:string,
  BlackList_ID:number,
  Users_id:number,
  User_IMG:string,
  User_ban_id:number
}