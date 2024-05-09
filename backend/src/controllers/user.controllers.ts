// Express
import { Request, Response } from "express";
// Models
import {
  AdminAssistantUser,
  AdminUser,
  StudentUser,
  TeacherUser,
} from "../models";
// Types
import { Role } from "../types";

// Base User Operations class that other user classes will extend
abstract class BaseUser {
  abstract create(userData: any): Promise<any>;
  abstract read(id: string, role: string): Promise<any>;
  abstract update(id: string, updateData: any, role: string): Promise<any>;
  abstract delete(id: string, role: string): Promise<any>;
}

class Admin extends BaseUser {
  async create(userData: any) {
    try {
      const user = await new AdminUser(userData).save();
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Email already exists");
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
      const updatedUser = await AdminUser.findOneAndUpdate(
        { _id: id, roles: { $in: [role] } },
        updateData,
        { new: true, runValidators: true }
      );

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
}

class Teacher extends BaseUser {
  async create(userData: any) {
    try {
      const user = await new TeacherUser(userData).save();
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Email already exists");
      }
      throw new Error(`Error creating teacher user: ${error.message}`);
    }
  }

  async read(id: string, role: string) {
    try {
      const user = await TeacherUser.findOne({
        _id: id,
        roles: { $in: [role] },
      }).populate("campusBranch", "carrer");

      if (!user) {
        throw new Error(`User with role ${role} not found. Cannot read user.`);
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error reading teacher user: ${error.message}`);
    }
  }

  async update(id: string, updateData: any, role: string) {
    try {
      const user = await TeacherUser.findOneAndUpdate(
        { _id: id, roles: { $in: [role] } },
        updateData,
        { new: true, runValidators: true }
      ).populate("campusBranch", "carrer");

      if (!user) {
        throw new Error(
          `User with role ${role} not found. Cannot update user.`
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
        roles: { $in: [role] },
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
}

class Student extends BaseUser {
  async create(userData: any) {
    try {
      const user = await new StudentUser(userData).save();
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Email already exists");
      }
      throw new Error(`Error creating student user: ${error.message}`);
    }
  }

  async read(id: string, role: string) {
    try {
      const user = await StudentUser.findOne({
        _id: id,
        roles: { $in: [role] },
      }).populate("campusBranch", "carrer");

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
      const user = await StudentUser.findOneAndUpdate(
        { _id: id, roles: { $in: [role] } },
        updateData,
        { new: true, runValidators: true }
      ).populate("campusBranch", "carrer");

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
}

class AdminAssistant extends BaseUser {
  async create(userData: any) {
    try {
      const user = await new AdminUser(userData).save();
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Email already exists");
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
      const user = await AdminAssistantUser.findOneAndUpdate(
        { _id: id, roles: { $in: [role] } },
        updateData,
        { new: true, runValidators: true }
      ).populate("campusBranch");

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
    const id = req.query.id as string;
    const userData = req.body;

    const user = new roleClassMap[role]();

    try {
      switch (method) {
        case "POST":
          try {
            const newUser = await user.create(userData);
            res.status(201).json(newUser);
          } catch (error: any) {
            res.status(400).json({ message: [error.message] });
          }
          break;
        case "GET":
          try {
            const userFound = await user.read(id, role);
            res.status(200).json(userFound);
          } catch (error: any) {
            res.status(400).json({ message: [error.message] });
          }
          break;
        case "PUT":
          try {
            const updatedUser = await user.update(id, userData, role);
            res.status(200).json(updatedUser);
          } catch (error: any) {
            res.status(400).json({ message: [error.message] });
          }
          break;
        case "DELETE":
          try {
            const deletedUser = await user.delete(id, role);
            res.status(200).json(deletedUser);
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
