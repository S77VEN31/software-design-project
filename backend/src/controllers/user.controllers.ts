// Express
import { Request, Response } from "express";
// Libs
import bcrypt from "bcryptjs";
// Models
import {
  AdminAssistantUser,
  AdminUser,
  CampusBranch,
  StudentUser,
  TeacherUser,
  Team,
} from "../models";
// Types
import { Role } from "../types";

// Base User Operations class that other user classes will extend
abstract class BaseUser {
  abstract create(userData: any): Promise<any>;
  abstract read(id: string, role: string): Promise<any>;
  abstract update(id: string, updateData: any, role: string): Promise<any>;
  abstract delete(id: string, role: string): Promise<any>;
  abstract list(userId: string, roles: string): Promise<any>;
}

class Admin extends BaseUser {
  async create(userData: any) {
    try {
      const { password, ...data } = userData;

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await new AdminUser({
        ...data,
        password: passwordHash,
      }).save();
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        throw new Error(`${field} already exists`);
      }
      throw new Error(`Error creating admin user: ${error.message}`);
    }
  }

  async read(id: string, role: string) {
    try {
      const user = await AdminUser.findOne({
        _id: id,
        roles: { $in: [role] },
      });

      if (!user) {
        throw new Error(`User with role ${role} not found. Cannot read user.`);
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error reading admin user: ${error.message}`);
    }
  }

  async update(id: string, updateData: any, role: string) {
    try {
      let updatedUser = null;
      if (updateData.password) {
        const passwordHash = await bcrypt.hash(updateData.password, 10);
        updatedUser = await AdminUser.findOneAndUpdate(
          { _id: id, roles: { $in: [role] } },
          { ...updateData, password: passwordHash},
          { new: true, runValidators: true }
        );
      } else {
        updatedUser = await AdminUser.findOneAndUpdate(
          { _id: id, roles: { $in: [role] } },
          updateData,
          { new: true, runValidators: true }
        );
      }

      if (!updatedUser) {
        throw new Error(
          `User with role ${role} not found. Cannot update user.`
        );
      }
      return updatedUser;
    } catch (error: any) {
      throw new Error(`Error updating admin user: ${error.message}`);
    }
  }

  async delete(id: string, role: string) {
    try {
      const user = await AdminUser.findOneAndDelete({
        _id: id,
        roles: { $in: [role] },
      });

      if (!user) {
        throw new Error(
          `User with role ${role} not found. Cannot delete user.`
        );
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error deleting admin user: ${error.message}`);
    }
  }

  async list() {
    try {
      const users = await AdminUser.find();
      return users;
    } catch (error: any) {
      throw new Error(`Error listing admin users: ${error.message}`);
    }
  }
}

class Teacher extends BaseUser {
  async create(userData: any) {
    try {
      const { password, roles, campusBranch, ...data } = userData;

      const campusBranchObject = await CampusBranch.findOne({
        _id: campusBranch,
      });

      if (!campusBranchObject) {
        throw new Error(`Campus branch not found`);
      }

      const coordinators = await TeacherUser.find({
        campusBranch: campusBranch,
        roles: { $in: ["Coordinator"] },
      });

      let newCoordinatorId = "";
      if (coordinators && coordinators.length > 0) {
        const lastCoordinator = coordinators[coordinators.length - 1];
        const lastCoordinatorNumber = parseInt(
          // @ts-expect-error Property 'coordinatorId' does not exist on type 'Document'
          lastCoordinator.coordinatorId.match(/\d+$/)[0]
        );
        const newCoordinatorNumber = lastCoordinatorNumber + 1;
        newCoordinatorId = `${campusBranchObject.initials}${newCoordinatorNumber}`;
      } else {
        newCoordinatorId = `${campusBranchObject.initials}1`;
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await new TeacherUser({
        ...data,
        roles,
        campusBranch,
        coordinatorId: roles.includes("Coordinator") ? newCoordinatorId : "",
        password: passwordHash,
      }).save();
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        throw new Error(`${field} already exists`);
      }
      throw new Error(`Error creating teacher user: ${error.message}`);
    }
  }

  async read(id: string, role: string) {
    try {
      const user = await TeacherUser.findOne({
        _id: id,
        /**
         * Check if user has the role passed in the params (Teacher) or if it is a Coordinator
         */
        roles: { $in: [role, "Coordinator"] },
      });
      if (!user) {
        throw new Error(
          `User with role Teacher or Coordinator not found. Cannot read user.`
        );
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error reading teacher user: ${error.message}`);
    }
  }

  async update(id: string, updateData: any, role: string) {
    try {
      const { roles, campusBranch } = updateData;

      const campusBranchObject = await CampusBranch.findOne({
        _id: campusBranch,
      });

      if (!campusBranchObject) {
        throw new Error(`Campus branch not found`);
      }

      const coordinators = await TeacherUser.find({
        campusBranch: campusBranch,
        roles: { $in: ["Coordinator"] },
      });

      if (!roles.includes("Coordinator")) {
        updateData.coordinatorId = null;
      }

      if (roles.includes("Coordinator")) {
        let newCoordinatorId = "";
        if (coordinators && coordinators.length > 0) {
          const lastCoordinator = coordinators[coordinators.length - 1];
          const lastCoordinatorNumber = parseInt(
            // @ts-expect-error Property 'coordinatorId' does not exist on type 'Document'
            lastCoordinator.coordinatorId.match(/\d+$/)[0]
          );
          const newCoordinatorNumber = lastCoordinatorNumber + 1;
          newCoordinatorId = `${campusBranchObject.initials}${newCoordinatorNumber}`;
        } else {
          newCoordinatorId = `${campusBranchObject.initials}1`;
        }
        updateData.coordinatorId = newCoordinatorId;
      }

      let user = null;
      if (updateData.password) {
        const passwordHash = await bcrypt.hash(updateData.password, 10);
        user = await AdminUser.findOneAndUpdate(
          { _id: id, roles: { $in: [role, "Coordinator"] } },
          { ...updateData, password: passwordHash},
          { new: true, runValidators: true }
        );
      } else {
        user = await AdminUser.findOneAndUpdate(
          { _id: id, roles: { $in: [role, "Coordinator"] } },
          updateData,
          { new: true, runValidators: true }
        );
      }

      if (!user) {
        throw new Error(
          `User with role Teacher or Coordinator not found. Cannot update user.`
        );
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error updating teacher user: ${error.message}`);
    }
  }

  async delete(id: string, role: string) {
    try {
      const user = await TeacherUser.findOneAndDelete({
        _id: id,
        roles: { $in: [role, "Coordinator"] },
      });

      if (!user) {
        throw new Error(
          `User with role ${role} not found. Cannot delete user.`
        );
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error deleting teacher user: ${error.message}`);
    }
  }

  async list() {
    try {
      const users = await TeacherUser.find()
        .select("-password")
        .populate("campusBranch")
        .populate("career");
      return users;
    } catch (error: any) {
      throw new Error(`Error listing teacher users: ${error.message}`);
    }
  }
}

class Student extends BaseUser {
  async create(userData: any) {
    try {
      const { password, ...data } = userData;
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await new StudentUser({
        ...data,
        password: passwordHash,
      }).save();
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        throw new Error(`${field} already exists`);
      }
      throw new Error(`Error creating student user: ${error.message}`);
    }
  }

  async read(id: string, role: string) {
    try {
      const user = await StudentUser.findOne({
        _id: id,
        roles: { $in: [role] },
      });

      if (!user) {
        throw new Error(`User with role ${role} not found. Cannot read user.`);
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error reading student user: ${error.message}`);
    }
  }

  async update(id: string, updateData: any, role: string) {
    try {
      let user = null;
      if (updateData.password) {
        const passwordHash = await bcrypt.hash(updateData.password, 10);
        user = await StudentUser.findOneAndUpdate(
          { _id: id, roles: { $in: [role] } },
          { ...updateData, password: passwordHash},
          { new: true, runValidators: true }
          ).populate("campusBranch", "career");
      } else {
        user = await StudentUser.findOneAndUpdate(
          { _id: id, roles: { $in: [role] } },
          updateData,
          { new: true, runValidators: true }
        ).populate("campusBranch", "career");
      }

      if (!user) {
        throw new Error(
          `User with role ${role} not found. Cannot update user.`
        );
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error updating student user: ${error.message}`);
    }
  }

  async delete(id: string, role: string) {
    try {
      const user = await StudentUser.findOneAndDelete({
        _id: id,
        roles: { $in: [role] },
      });

      if (!user) {
        throw new Error(
          `User with role ${role} not found. Cannot delete user.`
        );
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error deleting student user: ${error.message}`);
    }
  }

  async list(userId: string, roles: string) {
    const populateString = "campusBranch career";
    const selectString = "-password";
    let users;
    try {
      switch (roles) {
        case "Teacher":
          const teacherTeams = await Team.find({
            teachers: { $in: [userId] },
          }).select("students");
          const teacherStudentIds = teacherTeams.flatMap(
            (team) => team.students
          );
          users = await StudentUser.find({ _id: { $in: teacherStudentIds } })
            .populate(populateString)
            .select(selectString);
          break;
        case "Coordinator":
          const coordinatorTeams = await Team.find({
            coordinator: { $in: [userId] },
          }).select("students");
          const coordinatorStudentIds = coordinatorTeams.flatMap(
            (team) => team.students
          );
          users = await StudentUser.find({
            _id: { $in: coordinatorStudentIds },
          })
            .populate(populateString)
            .select(selectString);
          break;
        default:
          users = await StudentUser.find()
            .populate(populateString)
            .select(selectString)
            .populate(populateString);
          break;
      }
      return users;
    } catch (error: any) {
      throw new Error(`Error listing student users: ${error.message}`);
    }
  }
}

class AdminAssistant extends BaseUser {
  async create(userData: any) {
    try {
      const { password, ...data } = userData;
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await new AdminUser({
        ...data,
        password: passwordHash,
      }).save();
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        throw new Error(`${field} already exists`);
      }
      throw new Error(`Error creating admin assistant user: ${error.message}`);
    }
  }

  async read(id: string, role: string) {
    try {
      const user = await AdminAssistantUser.findOne({
        _id: id,
        roles: { $in: [role] },
      }).populate("campusBranch");

      if (!user) {
        throw new Error(`User with role ${role} not found. Cannot read user.`);
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error reading admin assistant user: ${error.message}`);
    }
  }

  async update(id: string, updateData: any, role: string) {
    try {
      let user = null;
      if (updateData.password) {
        const passwordHash = await bcrypt.hash(updateData.password, 10);
        user = await AdminAssistantUser.findOneAndUpdate(
          { _id: id, roles: { $in: [role] } },
          { ...updateData, password: passwordHash},
          { new: true, runValidators: true }
        ).populate("campusBranch");
      } else {
        user = await AdminAssistantUser.findOneAndUpdate(
          { _id: id, roles: { $in: [role] } },
          updateData,
          { new: true, runValidators: true }
        ).populate("campusBranch");
      }
      if (!user) {
        throw new Error(
          `User with role ${role} not found. Cannot update user.`
        );
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error updating admin assistant user: ${error.message}`);
    }
  }

  async delete(id: string, role: string) {
    try {
      const user = await AdminAssistantUser.findOneAndDelete({
        _id: id,
        roles: { $in: [role] },
      });

      if (!user) {
        throw new Error(
          `User with role ${role} not found. Cannot delete user.`
        );
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error deleting admin assistant user: ${error.message}`);
    }
  }

  async list() {
    try {
      const users = await AdminAssistantUser.find();
      return users;
    } catch (error: any) {
      throw new Error(`Error listing admin assistant users: ${error.message}`);
    }
  }
}

// Role to Class mapping
const roleClassMap = {
  Admin: Admin,
  Teacher: Teacher,
  Student: Student,
  AdminAssistant: AdminAssistant,
};

export class UserFactory {
  static async handleUserOperation(req: Request, res: Response) {
    const { method } = req;
    const role = req.params.role as Role;
    const { id, roles, userId } = req.query as {
      id: string;
      roles: string;
      userId: string;
    };
    const userData = req.body;

    const user = new roleClassMap[role]();

    try {
      switch (method) {
        case "POST":
          try {
            const newUser = await user.create(userData);
            res
              .status(201)
              .json({ message: [`Usuario creado`], user: newUser });
          } catch (error: any) {
            res.status(400).json({ message: [error.message] });
          }
          break;
        case "GET":
          if (id) {
            try {
              const userFound = await user.read(id, role);
              res.status(200).json(userFound);
            } catch (error: any) {
              res.status(400).json({ message: [error.message] });
            }
          } else {
            try {
              const users = await user.list(userId, roles);
              res.status(200).json(users);
            } catch (error: any) {
              res.status(400).json({ message: [error.message] });
            }
          }
          break;
        case "PUT":
          try {
            const updatedUser = await user.update(id, userData, role);
            res
              .status(200)
              .json({ message: [`Usuario actualizado`], user: updatedUser });
          } catch (error: any) {
            res.status(400).json({ message: [error.message] });
          }
          break;
        case "DELETE":
          try {
            const deletedUser = await user.delete(id, role);
            res
              .status(200)
              .json({ message: [`Usuario borrado`], user: deletedUser });
          } catch (error: any) {
            res.status(400).json({ message: [error.message] });
          }
          break;
        default:
          res.status(405).json({ message: [`Method ${method} not allowed`] });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}
